package user

import (
	db2 "backend/db"
	"backend/migration"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

var db = db2.Config()

var user migration.User

var count int64

type (
	jwtCustomClaims struct {
		Num string `json:"num"`
		ID  int    `json:"id"`
		jwt.StandardClaims
	}
	googleNum struct {
		Num string `json:"num"`
	}
)

func Login(c echo.Context) error {
	nums := &googleNum{}
	err := c.Bind(nums)
	if err != nil {
		return err
	}

	db.Model(migration.User{}).Where("google_num = ?", nums.Num).Find(&user)

	if user.ID == 0 {
		return c.JSON(http.StatusBadRequest, nil)
	}

	var claims = &jwtCustomClaims{
		user.GoogleNum,
		int(user.ID),
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(""))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": t,
	})
}

func ReLogin(c echo.Context) error {

	googles := c.Get("user").(*jwt.Token)
	claims := googles.Claims.(jwt.MapClaims)
	googling := claims["num"].(string)

	db.Model(&migration.User{}).Where("google_num = ?", googling).Count(&count)

	if count == 0 {
		return c.JSON(http.StatusOK, nil)
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": googles.Raw,
	})
}

func Hosting(c echo.Context) error {
	type host struct {
		Name   string `json:"name"`
		Age    string `json:"age"`
		Hobby  string `json:"hobby"`
		Lang   string `json:"lang"`
		Github string `json:"github"`
		Gitlab string `json:"gitlab"`
		Email  string `json:"email"`
	}

	hosts := &host{}

	db.Model(&migration.User{}).Limit(1).Find(&hosts)

	hosts.Age = diff(hosts.Age, time.Now())

	fmt.Println(hosts)
	return c.JSON(http.StatusOK, hosts)
}

func diff(a string, b time.Time) (year string) {
	y1, _ := strconv.Atoi(a[:4])
	y2, _, _ := b.Date()
	year = strconv.Itoa(y2 - y1)

	return
}
