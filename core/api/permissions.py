from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """
    Allows access only to admin users.
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_admin


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows read access to all users, but write access only to admin users.
    """
    
    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to admin users
        return request.user and request.user.is_admin


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission to allow access to the object owner or an admin.
    """
    
    def has_object_permission(self, request, view, obj):
        # Admin users have full access
        if request.user.is_admin:
            return True
            
        # Otherwise, only the owner can access
        return obj == request.user or getattr(obj, 'user', None) == request.user 