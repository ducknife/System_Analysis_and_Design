package com.ptit.gara.model;

public final class Status {

    public static final String APPOINTMENT_CONFIRMED = "Đã xác nhận";
    public static final String APPOINTMENT_RECEIVED = "Đã tiếp nhận";

    public static final String SLIP_DRAFT = "Chờ chọn dịch vụ/phụ tùng";
    public static final String SLIP_WAITING = "Chờ phân công";
    public static final String SLIP_IN_PROGRESS = "Đang thực hiện";
    public static final String SLIP_DONE = "Đã hoàn thành";

    public static final String SLOT_FREE = "Trống";
    public static final String SLOT_BUSY = "Đang sử dụng";

    public static final String SALARY_WAITING = "Chờ trả lương";
    public static final String SALARY_DONE = "Hoàn tất";

    public static final String PAY_TRANSFER = "Chuyển khoản";
    public static final String PAY_CASH = "Tiền mặt";

    public static final String ROLE_RECEIVE = "Tiếp nhận";
    public static final String ROLE_ASSIGN = "Phân công";

    private Status() {
    }
}
