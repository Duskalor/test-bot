#!/usr/bin/env bash

# Salir en caso de error
set -o errexit

# Actualizar paquetes e instalar Chromium
apt-get update
apt-get install -y chromium-browser