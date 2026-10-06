package config

import (
	"os"
	"strconv"
)

type AppConfig struct {
	Port int
	Env  string
}

func New() *AppConfig {
	return &AppConfig{
		Port: getEnvInt("HTTP_PORT", 4000),
		Env:  getEnv("APP_ENV", "development"),
	}
}

func getEnv(key, fallback string) string {
	s := os.Getenv(key)
	if s == "" {
		return fallback
	}

	return s
}
func getEnvInt(key string, fallback int) int {
	s := os.Getenv(key)
	if s == "" {
		return fallback
	}

	i, err := strconv.Atoi(s)
	if err != nil {
		return fallback
	}

	return i
}
