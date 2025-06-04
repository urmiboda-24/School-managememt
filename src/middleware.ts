import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ROLE, ROUTES } from "./utils/constant";

const adminDefaultRoute = ROUTES.ADMIN.DASHBOARD;
const hodDefaultRoute = ROUTES.HOD.DASHBOARD;
const teacherDefaultRoute = ROUTES.TEACHER.DASHBOARD;
const assistantTeacherDefaultRoute = ROUTES.ASSISTANTTEACHER.DASHBOARD;
const studentDefaultRoute = ROUTES.STUDENT.DASHBOARD;

const publicRoutes = [ROUTES.LOGIN, ROUTES.SIGN_UP];

const adminRoutes = [
  ROUTES.ADMIN.DASHBOARD,
  ROUTES.ADMIN.SUBJECT,
  ROUTES.ADMIN.DEPARTMENT,
];
const hodRoutes = [ROUTES.HOD.DASHBOARD];
const studentRoutes = [ROUTES.STUDENT.DASHBOARD];
const teacherRoutes = [ROUTES.TEACHER.DASHBOARD, ROUTES.TEACHER.USER];
const assistantTeacherRoutes = [
  ROUTES.ASSISTANTTEACHER.DASHBOARD,
  ROUTES.ASSISTANTTEACHER.USER,
];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);
  const token = request.cookies.get("authToken")?.value;
  if (!token) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_TOKEN_SECRET
    );
    const { payload } = await jwtVerify(token, secret);
    // const userRole = payload.role as string;
    const userRole = request.cookies.get("role")?.value;

    if (!userRole) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    const roleRoutes: Record<string, string[]> = {
      [ROLE.Admin]: adminRoutes,
      [ROLE.HOD]: hodRoutes,
      [ROLE.Teacher]: teacherRoutes,
      [ROLE.AssistantTeachers]: assistantTeacherRoutes,
      [ROLE.Students]: studentRoutes,
    };

    const defaultRoutes: Record<string, string> = {
      [ROLE.Admin]: adminDefaultRoute,
      [ROLE.HOD]: hodDefaultRoute,
      [ROLE.Teacher]: teacherDefaultRoute,
      [ROLE.AssistantTeachers]: assistantTeacherDefaultRoute,
      [ROLE.Students]: studentDefaultRoute,
    };

    const allowedRoutes = roleRoutes[userRole] || [];
    const defaultRedirect = defaultRoutes[userRole] || "/";

    if (isPublicRoute) {
      return NextResponse.redirect(new URL(defaultRedirect, request.url));
    }

    const isAllowed = allowedRoutes.some((route) =>
      currentPath.startsWith(route)
    );
    if (!isAllowed) {
      return NextResponse.redirect(new URL(defaultRedirect, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }
}

export const config = {
  matcher: [
    // PUBLIC ROUTE
    "/login",
    "/sign-up",
    // OTHER
    "/events",
    "/admin/:path*",
    "/student/:path*",
    "/teacher/:path*",
    "/hod/:path*",
    "/assistantTeacher/:path*",
  ],
};
