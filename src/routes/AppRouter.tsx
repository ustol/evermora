import { Route, Routes } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { RequireAuth } from "@/routes/RequireAuth"
import { RequireAdmin } from "@/routes/RequireAdmin"

import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import ServicesPage from "@/pages/ServicesPage"
import MemorialsDirectoryPage from "@/pages/MemorialsDirectoryPage"
import MemorialPage from "@/pages/MemorialPage"
import VendorsDirectoryPage from "@/pages/VendorsDirectoryPage"
import VendorPage from "@/pages/VendorPage"
import BlogListPage from "@/pages/BlogListPage"
import BlogPostPage from "@/pages/BlogPostPage"
import SignInPage from "@/pages/SignInPage"
import SignUpPage from "@/pages/SignUpPage"
import PrivacyPage from "@/pages/PrivacyPage"
import TermsPage from "@/pages/TermsPage"
import NotFoundPage from "@/pages/NotFoundPage"

import DashboardPage from "@/pages/dashboard/DashboardPage"
import DashboardMemorialsPage from "@/pages/dashboard/DashboardMemorialsPage"
import MemorialWizardPage from "@/pages/dashboard/MemorialWizardPage"
import MemorialEditPage from "@/pages/dashboard/MemorialEditPage"
import MemorialContentPage from "@/pages/dashboard/MemorialContentPage"
import MemorialGalleryPage from "@/pages/dashboard/MemorialGalleryPage"
import MemorialSettingsPage from "@/pages/dashboard/MemorialSettingsPage"
import DashboardProfilePage from "@/pages/dashboard/DashboardProfilePage"
import VendorDashboardPage from "@/pages/dashboard/VendorDashboardPage"

import AdminPage from "@/pages/admin/AdminPage"
import AdminGiftCatalogPage from "@/pages/admin/AdminGiftCatalogPage"
import AdminUsersPage from "@/pages/admin/AdminUsersPage"
import AdminMemorialsPage from "@/pages/admin/AdminMemorialsPage"
import AdminReportsPage from "@/pages/admin/AdminReportsPage"
import AdminHeroImagesPage from "@/pages/admin/AdminHeroImagesPage"
import AdminVendorsPage from "@/pages/admin/AdminVendorsPage"
import AdminBlogPage from "@/pages/admin/AdminBlogPage"
import AdminBlogEditorPage from "@/pages/admin/AdminBlogEditorPage"

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="memorials" element={<MemorialsDirectoryPage />} />
        <Route path="memorials/:slug" element={<MemorialPage />} />
        <Route path="vendors" element={<VendorsDirectoryPage />} />
        <Route path="vendors/:slug" element={<VendorPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="sign-in/*" element={<SignInPage />} />
        <Route path="sign-up/*" element={<SignUpPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="memorials" element={<DashboardMemorialsPage />} />
          <Route path="memorials/new" element={<MemorialWizardPage />} />
          <Route path="memorials/:id/edit" element={<MemorialEditPage />} />
          <Route
            path="memorials/:id/content"
            element={<MemorialContentPage />}
          />
          <Route
            path="memorials/:id/gallery"
            element={<MemorialGalleryPage />}
          />
          <Route
            path="memorials/:id/settings"
            element={<MemorialSettingsPage />}
          />
          <Route path="profile" element={<DashboardProfilePage />} />
          <Route path="vendor" element={<VendorDashboardPage />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="memorials" element={<AdminMemorialsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="hero-images" element={<AdminHeroImagesPage />} />
            <Route path="vendors" element={<AdminVendorsPage />} />
            <Route path="blog" element={<AdminBlogPage />} />
            <Route path="blog/new" element={<AdminBlogEditorPage />} />
            <Route path="blog/:id/edit" element={<AdminBlogEditorPage />} />
            <Route path="gifts" element={<AdminGiftCatalogPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
