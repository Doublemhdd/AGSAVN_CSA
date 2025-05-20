#!/bin/bash

set -e

# Wait for the database to be ready
echo "Waiting for database..."
python manage.py wait_for_db

# Apply migrations
echo "Applying migrations..."
python manage.py migrate

# Create superuser
echo "Creating superuser..."
python manage.py create_superuser

# Initialize categories
echo "Initializing categories..."
python manage.py init_categories

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Start the application
echo "Starting application..."
exec "$@" 