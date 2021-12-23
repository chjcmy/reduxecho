package migration

import (
	"time"
)

type Book struct {
	ID         int    `json:"id,omitempty"`
	Title      string `json:"title,omitempty"`
	Subject    string `json:"subject,omitempty"`
	UserID     int    `json:"user_id,omitempty"`
	User       User
	CategoryID int `json:"category_id,omitempty"`
	Category   Category
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type User struct {
	ID        int        `gorm:"primary_key"`
	Name      string     `json:"name,omitempty"`
	Email     string     `json:"email,omitempty"`
	Age       *time.Time `json:"age"`
	GoogleNum string     `json:"google_num,omitempty"`
	Hobby     string     `json:"hobby,omitempty"`
	Lang      string     `json:"lang,omitempty"`
	Github    string     `json:"github,omitempty"`
	Gitlab    string     `json:"gitlab,omitempty"`
}

type Category struct {
	ID           int    `gorm:"primary_key" json:"id,omitempty"`
	CategoryName string `json:"categoryName,omitempty"`
}
