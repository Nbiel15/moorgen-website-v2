
## Rencana Menyembunyikan Halaman Controls

### Tujuan
Menyembunyikan halaman Controls dari aplikasi untuk sementara waktu, tetapi tetap menyimpan kodenya agar mudah dimunculkan kembali nanti.

### Perubahan yang Akan Dilakukan

**1. Sembunyikan Route Controls**
- Comment route `/controls` di file routing
- Tambahkan redirect ke halaman Home jika user mencoba akses `/controls`

**2. Sembunyikan dari Mobile Navigation (Bawah Layar)**
- Hapus menu "Controls" dari navigasi mobile
- Layout akan menjadi 3 menu: Home, Progress, Support

**3. Sembunyikan dari Desktop Sidebar (Kiri)**
- Hapus menu "Controls" dari sidebar desktop
- Layout tetap rapi dengan 3 menu tersisa

### Catatan untuk Memunculkan Kembali
Semua kode hanya di-comment/filter, tidak dihapus. Untuk mengaktifkan kembali:
- Uncomment route `/controls`
- Tambahkan kembali item "Controls" ke navItems

### File yang Diubah
1. `src/components/AnimatedRoutes.tsx`
2. `src/components/dashboard/MobileNav.tsx`
3. `src/components/dashboard/DashboardSidebar.tsx`
