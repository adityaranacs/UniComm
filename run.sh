#!/bin/bash

BASE_DIR="$(pwd)"

apps=("host-app"  "mail-app" "backend" "chat-app")

for app in "${apps[@]}"; do
  echo "Installing dependencies for $app..."
  cd "$BASE_DIR/$app" && npm install
done

echo "All dependencies installed successfully!"

