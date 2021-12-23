package main

import (
	"backend/api/book"
	"backend/api/category"
	"backend/api/user"
	"backend/db"
	"backend/migration"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	db3 := db.Config()

	// Migrate the schema
	err := db3.AutoMigrate(&migration.Book{}, &migration.Category{}, &migration.User{})
	if err != nil {
		return
	}

	e.GET("/hosting", user.Hosting)
	e.GET("/bookread/:id", book.BookRead)
	e.GET("/bookshow", book.BookShow)
	e.GET("/pickunitbooks/:id", book.PickCategoryBook)
	e.DELETE("/bookdelete/:id", book.BookDelete)
	e.PUT("/bookupdate/:id", book.BookUpdate)
	e.POST("/login", user.Login)
	e.GET("/unitshosting", category.CategoryHosting)
	e.GET("/search/:id", book.BookSearch)
	r := e.Group("/re")

	// Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		SigningKey: []byte("chltjdgus123!"),
	}
	r.Use(middleware.JWTWithConfig(config))
	r.GET("/login", user.ReLogin)
	r.POST("/bookcreate", book.BookCreate)
	e.Logger.Fatal(e.Start(":8000"))
}
