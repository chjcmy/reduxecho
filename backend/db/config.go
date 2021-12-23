package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Config() *gorm.DB {
	dsn := ""
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{Logger: logger.Default.LogMode(logger.Info)}) //nolint:exhaustivestruct
	return db                                                                                      //nolint:wsl
}
