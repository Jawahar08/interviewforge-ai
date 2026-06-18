#!/bin/bash
set -e

# Change directory to the backend directory where this script is located
cd "$(dirname "$0")"

# Detect architecture
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    JDK_ARCH="aarch64"
else
    JDK_ARCH="x64"
fi

echo "=== System Architecture ==="
echo "Detected architecture: $ARCH (using Adoptium binary for $JDK_ARCH)"

# Directory to store local JDK
JDK_DIR="./.jdk"
mkdir -p "$JDK_DIR"

# Check if JDK is already installed in .jdk
if [ ! -d "$JDK_DIR/Contents/Home" ]; then
    echo "=== Downloading JDK ==="
    echo "Portable JDK not found in $JDK_DIR. Downloading Eclipse Temurin OpenJDK 21..."
    TAR_FILE="openjdk21.tar.gz"
    
    # Download using curl
    curl -L "https://api.adoptium.net/v3/binary/latest/21/ga/mac/${JDK_ARCH}/jdk/hotspot/normal/eclipse?project=jdk" -o "$TAR_FILE"
    
    echo "=== Extracting JDK ==="
    echo "Extracting OpenJDK 21..."
    tar -xzf "$TAR_FILE" -C "$JDK_DIR" --strip-components=1
    rm "$TAR_FILE"
    echo "OpenJDK 21 downloaded and extracted successfully."
fi

# Locate JAVA_HOME (macOS JDK tarball structure: jdk-21.x.y/Contents/Home)
export JAVA_HOME="$(pwd)/$JDK_DIR/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"

echo "=== JDK Environment ==="
echo "JAVA_HOME set to: $JAVA_HOME"
echo "Java binary path: $(which java)"
java -version

echo "=== Building Project ==="
chmod +x ./mvnw
./mvnw clean package -DskipTests

echo "=== Build Successful ==="
echo "To run the application locally (requires PostgreSQL database running on localhost:5432):"
echo "./.jdk/Contents/Home/bin/java -jar target/*.jar"
