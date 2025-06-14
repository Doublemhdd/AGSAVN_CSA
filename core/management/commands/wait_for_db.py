import time
from django.db import connection
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Django command to pause execution until database is available."""
    
    help = "Wait for database connection to be available"
    
    def handle(self, *args, **options):
        """Handle the command."""
        self.stdout.write("Waiting for database...")
        db_up = False
        while not db_up:
            try:
                # Check if the database connection is available
                connection.ensure_connection()
                db_up = True
            except OperationalError:
                self.stdout.write("Database unavailable, waiting 1 second...")
                time.sleep(1)
        
        self.stdout.write(self.style.SUCCESS("Database available!")) 