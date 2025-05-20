import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    """Django command to create a superuser if it doesn't exist."""
    
    help = "Create a superuser if it doesn't exist"
    
    def handle(self, *args, **options):
        """Handle the command."""
        self.stdout.write("Checking if superuser exists...")
        
        email = os.environ.get('ADMIN_EMAIL', 'admin@agsavn.org')
        password = os.environ.get('ADMIN_PASSWORD', 'admin123')
        
        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.SUCCESS(f"Superuser {email} already exists"))
            return
        
        self.stdout.write(f"Creating superuser {email}...")
        User.objects.create_superuser(
            email=email,
            password=password,
            full_name='Admin AGSAVN'
        )
        self.stdout.write(self.style.SUCCESS(f"Superuser {email} created successfully!")) 