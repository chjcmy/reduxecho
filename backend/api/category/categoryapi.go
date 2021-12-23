package category

import (
	db2 "backend/db"
	"backend/migration"
	"github.com/labstack/echo/v4"
	"net/http"
)

var db = db2.Config()

var Categories []migration.Category

func CategoryHosting(c echo.Context) error {
	result := db.Find(&Categories)

	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, Categories)
}
