package main

import (
	"fmt"
	"time"
)

const (
	// See http://golang.org/pkg/time/#Parse
	timeFormat = "2006-01-02 15:04 MST"
)

func main() {
	v := "2014-05-03 20:57 UTC"
	then, err := time.Parse(timeFormat, v)
	if err != nil {
		fmt.Println(err)
		return
	}
	duration := time.Since(then)
	fmt.Println(duration.Hours())
}
