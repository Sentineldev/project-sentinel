package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func MakeApiGroup(server *echo.Echo) *echo.Group {

	api := server.Group("/api")

	api.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello from server!")
	})

	return api

}
