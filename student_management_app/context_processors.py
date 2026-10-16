def announcement_count(request):
    # Gives every page the numbers for the top bar icons
    if not request.user.is_authenticated:
        return {}

    user_type = str(request.user.user_type)

    # Staff and students: announcements they have not opened yet
    if user_type in ("2", "3"):
        from .models import Announcement, AnnouncementRead

        read_ids = AnnouncementRead.objects.filter(user=request.user).values_list('announcement_id', flat=True)
        count = Announcement.objects.exclude(id__in=read_ids).count()
        return {"unread_announcements": count}

    # HOD: student leave requests still waiting for a decision (leave_status 0 = Pending)
    if user_type == "1":
        from .models import LeaveReportStudent

        return {"pending_student_leaves": LeaveReportStudent.objects.filter(leave_status=0).count()}

    return {}