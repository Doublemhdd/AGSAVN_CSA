"""
Custom settings file for using MySQL instead of PostgreSQL
"""

from .settings import *

# Override database settings to use MySQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_db',
        'USER': 'django_user',
        'PASSWORD': 'django_password',
        'HOST': '127.0.0.1',  # Local connection
        'PORT': '24048',      # The mapped port from Docker
    }
} 