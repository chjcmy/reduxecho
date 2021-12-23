package book

import (
	db2 "backend/db"
	"backend/migration"
	"fmt"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	_ "go/ast"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

var db = db2.Config()

var Bs = new([]migration.Book)

func BookCreate(c echo.Context) error {

	var B = new(migration.Book)

	googles := c.Get("user").(*jwt.Token)
	claims := googles.Claims.(jwt.MapClaims)
	id := claims["id"].(float64)

	if err := c.Bind(&B); err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusOK, err)
	}

	fmt.Println(&B)

	B.UserID = int(id)

	fmt.Println(&B)

	result := db.Select("title", "subject", "user_id", "category_id").Create(&B)

	fmt.Println(result)

	return c.JSON(http.StatusOK, nil)
}

func BookRead(c echo.Context) error {

	var B = new(migration.Book)

	id, _ := strconv.Atoi(c.Param("id"))

	fmt.Println(id)

	result := db.
		Where("books.id = ?", id).
		Preload("User", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("id, name")
		}).
		Preload("Category", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("id, category_name")
		}).
		First(&B)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, &B)
	}

	return c.JSON(http.StatusOK, &B)
}

func BookShow(c echo.Context) error {

	type name struct {
		CategoryFindResult []migration.Category
		PostFindResult     []migration.Book
	}

	var results = name{}

	result := db.
		Order("updated_at desc").
		Preload("User", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("ID, name")
		}).
		Preload("Category", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("ID, category_name")
		}).
		Select("books.id, books.title, books.user_id, books.category_id, books.created_at, updated_at").
		Find(&results.PostFindResult)

	result2 := db.Find(&results.CategoryFindResult)

	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	if result2.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, &results)
}

func BookUpdate(c echo.Context) error {

	var B = new(migration.Book)

	id, _ := strconv.Atoi(c.Param("id"))

	if err := c.Bind(B); err != nil {
		return nil
	}

	result := db.Model(&B).Where(id).Updates(&B)

	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, result.Error)
}

func BookDelete(c echo.Context) error {

	var B = new(migration.Book)

	id, _ := strconv.Atoi(c.Param("id"))

	result := db.Delete(&B, id)

	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, result.Error)
}

func PickCategoryBook(c echo.Context) error {

	id, _ := strconv.Atoi(c.Param("id"))

	result := db.
		Where("books.category_id = ?", id).
		Preload("User", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("ID, name")
		}).
		Preload("Category", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("ID, category_name")
		}).
		Select("books.id, books.title, books.user_id, books.category_id, books.created_at, updated_at").
		Order("updated_at desc").
		Find(&Bs)
	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, &Bs)
}

func BookSearch(c echo.Context) error {

	id := c.Param("id")

	result := db.
		Where("books.title LIKE ?", "%" + id + "%").
		Preload("User", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("ID, name")
		}).
		Preload("Category", func(tx *gorm.DB) *gorm.DB {
			return tx.Select("ID, category_name")
		}).
		Select("books.id, books.title, books.user_id, books.category_id, books.created_at, updated_at").
		Order("updated_at desc").
		Find(&Bs)
	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, &Bs)
}
