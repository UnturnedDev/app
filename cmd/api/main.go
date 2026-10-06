package main

import (
	"log/slog"
	"os"

	"api.unturned.dev/internal/config"
	"api.unturned.dev/internal/router"
)

func main() {
	cfg := config.New()
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	mux := router.Routes()
	if err := serve(cfg, logger, mux); err != nil {
		logger.Error(err.Error())
		os.Exit(1)
	}
}
