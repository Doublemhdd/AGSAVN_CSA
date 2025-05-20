FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=agsavn_backend.settings

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 8000

# Set the entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "agsavn_backend.wsgi:application", "--workers", "4"]

