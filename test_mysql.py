import MySQLdb

print("Attempting to connect to MySQL...")

try:
    # Connect to MySQL
    connection = MySQLdb.connect(
        host='127.0.0.1',
        port=24048,
        user='django_user',
        passwd='django_password',
        db='django_db'
    )
    
    cursor = connection.cursor()
    
    # Test the connection
    cursor.execute('SELECT VERSION()')
    version = cursor.fetchone()
    print(f"Connected to MySQL version: {version[0]}")
    
    # Clean up
    cursor.close()
    connection.close()
    print("Connection closed successfully.")
    
except Exception as e:
    print(f"Error connecting to MySQL: {e}") 