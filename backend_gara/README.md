# Backend hệ thống quản lý gara

Spring Boot 4.1.2, Java 21, PostgreSQL 18.

## Chuẩn bị CSDL (một lần mỗi máy)

1. Tạo database tên `gara` trong PostgreSQL:

   ```
   psql -U postgres -p 5432 -c "CREATE DATABASE gara"
   ```

2. Tạo file `src/main/resources/application-local.properties` với thông tin của máy mình
   (file này đã bị git bỏ qua, không bị đẩy lên):

   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/gara
   spring.datasource.username=postgres
   spring.datasource.password=mat_khau_cua_ban
   ```

   Không tạo file này thì backend dùng mặc định `localhost:5432`, `postgres` / `postgres`.

## Chạy

Backend (cổng 8080), trong thư mục `backend_gara`:

```
mvn spring-boot:run
```

Lần chạy đầu, Flyway tự tạo bảng và nạp dữ liệu mẫu.

Frontend (cổng 5180), trong thư mục `giao_dien_gara`:

```
npm ci
npm run dev
```

Mở http://localhost:5180, đăng nhập quản lý `A` / `123a123@` (hoặc `ql2` / `123a123@`).

## Xóa dữ liệu, nạp lại dữ liệu mẫu

Tắt backend, rồi:

```
psql -U postgres -p 5432 -c "DROP DATABASE gara" -c "CREATE DATABASE gara"
```
