package com.ptit.gara.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.ptit.gara.dao.AppointmentDAO;
import com.ptit.gara.dao.CarDAO;
import com.ptit.gara.dao.ComponentDAO;
import com.ptit.gara.dao.CustomerDAO;
import com.ptit.gara.dao.SalaryTableDAO;
import com.ptit.gara.dao.ServiceDAO;
import com.ptit.gara.dao.ServiceSlipDAO;
import com.ptit.gara.dao.SlotDAO;
import com.ptit.gara.dao.StaffDAO;
import com.ptit.gara.dao.UserDAO;
import com.ptit.gara.dto.Dto.AddComponentRequest;
import com.ptit.gara.dto.Dto.AddServiceRequest;
import com.ptit.gara.dto.Dto.AppointmentDTO;
import com.ptit.gara.dto.Dto.AssignStaffRequest;
import com.ptit.gara.dto.Dto.CarDTO;
import com.ptit.gara.dto.Dto.ChooseSlotRequest;
import com.ptit.gara.dto.Dto.ComponentDTO;
import com.ptit.gara.dto.Dto.CreateSalaryRequest;
import com.ptit.gara.dto.Dto.CustomerDTO;
import com.ptit.gara.dto.Dto.CustomerInfoDTO;
import com.ptit.gara.dto.Dto.LoginRequest;
import com.ptit.gara.dto.Dto.ManagerDTO;
import com.ptit.gara.dto.Dto.NewCustomerDTO;
import com.ptit.gara.dto.Dto.PaymentMethodRequest;
import com.ptit.gara.dto.Dto.ReceiptRequest;
import com.ptit.gara.dto.Dto.ReceivedRequest;
import com.ptit.gara.dto.Dto.SalarySummaryDTO;
import com.ptit.gara.dto.Dto.SalaryTableDTO;
import com.ptit.gara.dto.Dto.ServiceDTO;
import com.ptit.gara.dto.Dto.ServiceSlipDTO;
import com.ptit.gara.dto.Dto.SlotDTO;
import com.ptit.gara.dto.Dto.StaffDTO;
import com.ptit.gara.dto.Dto.StaffWorkDTO;
import com.ptit.gara.model.Appointment;
import com.ptit.gara.model.AppointmentDetail;
import com.ptit.gara.model.Car;
import com.ptit.gara.model.Component;
import com.ptit.gara.model.ComponentDetail;
import com.ptit.gara.model.Customer;
import com.ptit.gara.model.Manager;
import com.ptit.gara.model.SalaryTable;
import com.ptit.gara.model.Service;
import com.ptit.gara.model.ServiceDetail;
import com.ptit.gara.model.ServiceSlip;
import com.ptit.gara.model.SlipHandling;
import com.ptit.gara.model.Slot;
import com.ptit.gara.model.Staff;
import com.ptit.gara.model.Status;
import com.ptit.gara.model.User;

@RestController
@RequestMapping("/api")
@Transactional
public class RESTController {

    private final UserDAO userDAO;
    private final CustomerDAO customerDAO;
    private final CarDAO carDAO;
    private final AppointmentDAO appointmentDAO;
    private final ServiceSlipDAO serviceSlipDAO;
    private final ServiceDAO serviceDAO;
    private final ComponentDAO componentDAO;
    private final StaffDAO staffDAO;
    private final SlotDAO slotDAO;
    private final SalaryTableDAO salaryTableDAO;

    public RESTController(UserDAO userDAO, CustomerDAO customerDAO, CarDAO carDAO, AppointmentDAO appointmentDAO,
            ServiceSlipDAO serviceSlipDAO, ServiceDAO serviceDAO, ComponentDAO componentDAO, StaffDAO staffDAO,
            SlotDAO slotDAO, SalaryTableDAO salaryTableDAO) {
        this.userDAO = userDAO;
        this.customerDAO = customerDAO;
        this.carDAO = carDAO;
        this.appointmentDAO = appointmentDAO;
        this.serviceSlipDAO = serviceSlipDAO;
        this.serviceDAO = serviceDAO;
        this.componentDAO = componentDAO;
        this.staffDAO = staffDAO;
        this.slotDAO = slotDAO;
        this.salaryTableDAO = salaryTableDAO;
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleError(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(Map.of("message", e.getReason()));
    }

    private static ResponseStatusException error(HttpStatus status, String message) {
        return new ResponseStatusException(status, message);
    }

    private <T> T get(Class<T> type, Object id, String message) {
        T entity = id == null ? null : serviceSlipDAO.find(type, id);
        if (entity == null) {
            throw error(HttpStatus.NOT_FOUND, message);
        }
        return entity;
    }

    private ServiceSlip getSlip(int id) {
        return get(ServiceSlip.class, id, "Không tìm thấy phiếu dịch vụ");
    }

    private void addHandling(ServiceSlip ss, Integer managerID, String role) {
        SlipHandling handling = new SlipHandling();
        handling.setServiceSlip(ss);
        handling.setManager(get(Manager.class, managerID, "Không tìm thấy quản lý"));
        handling.setRole(role);
        handling.setHandledAt(LocalDateTime.now());
        ss.getListSlipHandling().add(handling);
    }

    private SalaryTable getEditableSalaryTable(Integer id) {
        SalaryTable t = get(SalaryTable.class, id, "Không tìm thấy bảng lương");
        if (Status.SALARY_DONE.equals(t.getStatus())) {
            throw error(HttpStatus.CONFLICT, "Bảng lương tháng này đã hoàn tất, không sửa được nữa");
        }
        return t;
    }

    private double totalLabor(Staff st, int month, int year) {
        return staffDAO.getServiceDetailsOfStaffInMonth(st, month, year).stream()
                .mapToDouble(ServiceDetail::getLaborContent).sum();
    }

    @PostMapping("/login")
    public ManagerDTO login(@RequestBody LoginRequest request) {
        User u = new User();
        u.setUsername(request.username());
        u.setPassword(request.password());
        Manager m = userDAO.checkLogin(u);
        if (m == null) {
            throw error(HttpStatus.UNAUTHORIZED, "Sai tên đăng nhập hoặc mật khẩu");
        }
        return ManagerDTO.of(m);
    }

    @GetMapping("/customers/search")
    public CustomerInfoDTO searchCustomer(@RequestParam String phone) {
        Customer c = customerDAO.findCustomerInfoByPhone(phone.trim());
        if (c == null) {
            throw error(HttpStatus.NOT_FOUND, "Không tìm thấy thông tin khách hàng/xe");
        }
        List<AppointmentDTO> appointments = new ArrayList<>();
        for (Appointment a : appointmentDAO.findAppointmentsOfCustomer(c)) {
            for (AppointmentDetail d : a.getListAppointmentDetail()) {
                String status = serviceSlipDAO.hasServiceSlip(d) ? Status.APPOINTMENT_RECEIVED : a.getStatus();
                appointments.add(new AppointmentDTO(a.getAppointmentID(), d.getAppointmentDetailID(),
                        d.getCar().getCarID(), d.getCar().getLicensePlate(), a.getTime(), status));
            }
        }
        List<CarDTO> cars = carDAO.findCarsOfCustomer(c).stream().map(CarDTO::of).toList();
        return new CustomerInfoDTO(CustomerDTO.of(c), cars, appointments);
    }

    @PostMapping("/customers")
    public NewCustomerDTO addCustomer(@RequestBody NewCustomerDTO request) {
        if (customerDAO.findCustomerInfoByPhone(request.customer().phone()) != null) {
            throw error(HttpStatus.CONFLICT, "Số điện thoại đã có trong hệ thống");
        }
        if (carDAO.hasLicensePlate(request.car().licensePlate())) {
            throw error(HttpStatus.CONFLICT, "Biển số xe đã tồn tại trong hệ thống");
        }
        Customer c = new Customer();
        c.setFullname(request.customer().fullname());
        c.setPhone(request.customer().phone());
        c.setEmail(request.customer().email());
        c.setAddress(request.customer().address());
        c.setUsername(request.customer().phone());
        c.setPassword("");
        customerDAO.addCustomer(c);

        Car car = new Car();
        car.setCustomer(c);
        car.setLicensePlate(request.car().licensePlate());
        car.setBrand(request.car().brand());
        car.setModel(request.car().model());
        car.setYear(request.car().year());
        carDAO.addCar(car);
        return new NewCustomerDTO(CustomerDTO.of(c), CarDTO.of(car));
    }

    @PostMapping("/service-slips")
    public ServiceSlipDTO createServiceSlip(@RequestBody ReceiptRequest request) {
        Car car = get(Car.class, request.carID(), "Không tìm thấy xe");
        ServiceSlip draft = serviceSlipDAO.findDraftServiceSlipOfCar(car);
        if (draft != null) {
            return ServiceSlipDTO.of(draft);
        }

        AppointmentDetail detail;
        if (request.appointmentDetailID() == null) {
            detail = appointmentDAO.createAppointmentAtCounter(car.getCustomer(), car).getListAppointmentDetail().get(0);
        } else {
            detail = get(AppointmentDetail.class, request.appointmentDetailID(), "Không tìm thấy lịch hẹn");
            if (serviceSlipDAO.hasServiceSlip(detail)) {
                throw error(HttpStatus.CONFLICT, "Xe này đã được tiếp nhận theo lịch hẹn");
            }
        }

        ServiceSlip ss = new ServiceSlip();
        ss.setAppointmentDetail(detail);
        ss.setTime(LocalDateTime.now());
        ss.setStatus(Status.SLIP_DRAFT);
        addHandling(ss, request.managerID(), Status.ROLE_RECEIVE);
        serviceSlipDAO.createServiceSlip(ss);

        Appointment a = detail.getAppointment();
        if (a.getListAppointmentDetail().stream().allMatch(serviceSlipDAO::hasServiceSlip)) {
            a.setStatus(Status.APPOINTMENT_RECEIVED);
            appointmentDAO.updateAppointmentStatus(a);
        }
        return ServiceSlipDTO.of(ss);
    }

    @GetMapping("/service-slips/{id}")
    public ServiceSlipDTO getServiceSlip(@PathVariable int id) {
        return ServiceSlipDTO.of(getSlip(id));
    }

    @GetMapping("/service-slips")
    public List<ServiceSlipDTO> findServiceSlips(@RequestParam(defaultValue = "") String keyword) {
        return serviceSlipDAO.findServiceSlipByKeyword(keyword).stream().map(ServiceSlipDTO::of).toList();
    }

    @PostMapping("/service-slips/{id}/services")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addService(@PathVariable int id, @RequestBody AddServiceRequest request) {
        ServiceSlip ss = getSlip(id);
        Service sv = get(Service.class, request.serviceID(), "Không tìm thấy dịch vụ");
        if (ss.findServiceDetail(sv.getServiceID()) != null) {
            throw error(HttpStatus.CONFLICT, "Dịch vụ đã có trong phiếu");
        }
        serviceSlipDAO.addServiceToSlip(ss, sv);
    }

    @DeleteMapping("/service-slips/{id}/services/{serviceID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeService(@PathVariable int id, @PathVariable int serviceID) {
        serviceSlipDAO.removeServiceFromSlip(getSlip(id), get(Service.class, serviceID, "Không tìm thấy dịch vụ"));
    }

    @PostMapping("/service-slips/{id}/components")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addComponent(@PathVariable int id, @RequestBody AddComponentRequest request) {
        ServiceSlip ss = getSlip(id);
        Component c = get(Component.class, request.componentID(), "Không tìm thấy phụ tùng");
        int qty = request.qty() == null ? 1 : request.qty();
        if (qty < 1) {
            throw error(HttpStatus.BAD_REQUEST, "Số lượng phải lớn hơn 0");
        }
        if (qty > c.getInventoryQty()) {
            throw error(HttpStatus.CONFLICT, "Số lượng vượt quá tồn kho (còn " + c.getInventoryQty() + ")");
        }
        serviceSlipDAO.addComponentToSlip(ss, c, qty);
        c.setInventoryQty(c.getInventoryQty() - qty);
        componentDAO.updateInventoryQty(c);
    }

    @DeleteMapping("/service-slips/{id}/components/{componentID}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeComponent(@PathVariable int id, @PathVariable int componentID) {
        ServiceSlip ss = getSlip(id);
        Component c = get(Component.class, componentID, "Không tìm thấy phụ tùng");
        ComponentDetail detail = ss.findComponentDetail(componentID);
        if (detail == null) {
            return;
        }
        c.setInventoryQty(c.getInventoryQty() + detail.getQty());
        componentDAO.updateInventoryQty(c);
        serviceSlipDAO.removeComponentFromSlip(ss, c);
    }

    @PutMapping("/service-slips/{id}/save")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveServiceSlip(@PathVariable int id) {
        ServiceSlip ss = getSlip(id);
        if (ss.getListServiceDetail().isEmpty()) {
            throw error(HttpStatus.BAD_REQUEST, "Phiếu dịch vụ chưa có dịch vụ nào");
        }
        serviceSlipDAO.saveServiceSlip(ss);
    }

    @PutMapping("/service-slips/{id}/services/{serviceID}/staff")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void assignStaff(@PathVariable int id, @PathVariable int serviceID, @RequestBody AssignStaffRequest request) {
        ServiceSlip ss = getSlip(id);
        Service sv = get(Service.class, serviceID, "Không tìm thấy dịch vụ");
        Staff st = null;
        if (request.staffID() != null) {
            st = get(Staff.class, request.staffID(), "Không tìm thấy nhân viên");
            if (staffDAO.getBusyStaffIDs().contains(st.getUserID())) {
                throw error(HttpStatus.CONFLICT, "Nhân viên " + st.getFullname() + " đang bận");
            }
        }
        serviceSlipDAO.assignStaffToServiceDetail(ss, sv, st);
    }

    @PutMapping("/service-slips/{id}/slot")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void chooseSlot(@PathVariable int id, @RequestBody ChooseSlotRequest request) {
        ServiceSlip ss = getSlip(id);
        if (ss.getListServiceDetail().stream().anyMatch(detail -> detail.getStaff() == null)) {
            throw error(HttpStatus.BAD_REQUEST,
                    "Vui lòng chọn nhân viên cho tất cả dịch vụ trong phiếu trước khi xác nhận");
        }
        Slot slot = get(Slot.class, request.slotID(), "Không tìm thấy khoang sửa chữa");
        if (!Status.SLOT_FREE.equals(slot.getStatus())) {
            throw error(HttpStatus.CONFLICT, "Khoang sửa chữa này đang có xe");
        }
        slot.setStatus(Status.SLOT_BUSY);
        slotDAO.updateSlotStatus(slot);

        ss.setSlot(slot);
        ss.setStatus(Status.SLIP_IN_PROGRESS);
        addHandling(ss, request.managerID(), Status.ROLE_ASSIGN);
        serviceSlipDAO.updateServiceSlip(ss);
    }

    @GetMapping("/services")
    public List<ServiceDTO> findServices(@RequestParam(defaultValue = "") String keyword) {
        return serviceDAO.findServicesByKeyword(keyword).stream().map(ServiceDTO::of).toList();
    }

    @GetMapping("/components")
    public List<ComponentDTO> findComponents(@RequestParam(defaultValue = "") String keyword) {
        return componentDAO.findComponentByKeyword(keyword).stream().map(ComponentDTO::of).toList();
    }

    @GetMapping("/staffs")
    public List<StaffDTO> getStaffList() {
        Set<Integer> busy = staffDAO.getBusyStaffIDs();
        return staffDAO.getStaffList().stream()
                .map(st -> new StaffDTO(st.getUserID(), st.getEmployeeCode(), st.getFullname(),
                        st.getSpecialization(), busy.contains(st.getUserID())))
                .toList();
    }

    @GetMapping("/staffs/{id}/service-details")
    public List<StaffWorkDTO> getStaffWork(@PathVariable int id, @RequestParam int month, @RequestParam int year) {
        Staff st = get(Staff.class, id, "Không tìm thấy nhân viên");
        return staffDAO.getServiceDetailsOfStaffInMonth(st, month, year).stream().map(StaffWorkDTO::of).toList();
    }

    @GetMapping("/slots")
    public List<SlotDTO> getSlots() {
        return slotDAO.getAvailableSlots().stream().map(SlotDTO::of).toList();
    }

    @GetMapping("/salary-tables/check")
    public boolean checkSalaryTable(@RequestParam int month, @RequestParam int year) {
        return salaryTableDAO.checkSalaryTableOfMonth(month, year);
    }

    @GetMapping("/salary-summary")
    public List<SalarySummaryDTO> getSalarySummary(@RequestParam int month, @RequestParam int year) {
        return staffDAO.getStaffList().stream()
                .map(st -> new SalarySummaryDTO(st.getUserID(), st.getEmployeeCode(), st.getFullname(),
                        totalLabor(st, month, year)))
                .toList();
    }

    @PostMapping("/salary-tables")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveSalaryTables(@RequestBody CreateSalaryRequest request) {
        if (salaryTableDAO.checkSalaryTableOfMonth(request.month(), request.year())) {
            throw error(HttpStatus.CONFLICT, "Tháng lương đã được tính, vui lòng chọn lại");
        }
        Manager m = get(Manager.class, request.managerID(), "Không tìm thấy quản lý");
        List<SalaryTable> list = new ArrayList<>();
        for (Staff st : staffDAO.getStaffList()) {
            SalaryTable t = new SalaryTable();
            t.setStaff(st);
            t.setManager(m);
            t.setMonth(request.month());
            t.setYear(request.year());
            t.setLaborUnitPrice(request.laborUnitPrice());
            t.setIsReceived(false);
            t.setStatus(Status.SALARY_WAITING);
            list.add(t);
        }
        salaryTableDAO.saveAllSalaryTableOfMonth(list);
    }

    @GetMapping("/salary-tables")
    public List<SalaryTableDTO> getSalaryTables(@RequestParam int month, @RequestParam int year) {
        return salaryTableDAO.getSalaryTablesOfMonth(month, year).stream()
                .map(t -> new SalaryTableDTO(t.getSalaryTableID(), t.getStaff().getEmployeeCode(),
                        t.getStaff().getFullname(), t.getLaborUnitPrice(), totalLabor(t.getStaff(), month, year),
                        t.getPaymentMethod(), t.getIsReceived()))
                .toList();
    }

    @PutMapping("/salary-tables/payment-methods")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void savePaymentMethods(@RequestBody List<PaymentMethodRequest> request) {
        for (PaymentMethodRequest item : request) {
            SalaryTable t = getEditableSalaryTable(item.salaryTableID());
            if (!Status.PAY_TRANSFER.equals(item.paymentMethod()) && !Status.PAY_CASH.equals(item.paymentMethod())) {
                throw error(HttpStatus.BAD_REQUEST, "Hình thức trả lương không hợp lệ");
            }
            if (Status.PAY_TRANSFER.equals(item.paymentMethod()) && t.getStaff().getBankAccount().isBlank()) {
                throw error(HttpStatus.BAD_REQUEST,
                        "Nhân viên " + t.getStaff().getFullname() + " chưa có số tài khoản, không trả chuyển khoản được");
            }
            t.setPaymentMethod(item.paymentMethod());
            salaryTableDAO.savePaymentMethod(t);
        }
    }

    @PutMapping("/salary-tables/received")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateReceived(@RequestBody List<ReceivedRequest> request) {
        List<SalaryTable> list = new ArrayList<>();
        for (ReceivedRequest item : request) {
            SalaryTable t = getEditableSalaryTable(item.salaryTableID());
            t.setIsReceived(Boolean.TRUE.equals(item.isReceived()));
            list.add(t);
        }
        boolean done = list.stream().allMatch(SalaryTable::getIsReceived);
        for (SalaryTable t : list) {
            if (done) {
                t.setStatus(Status.SALARY_DONE);
            }
            salaryTableDAO.updateIsReceived(t);
        }
    }
}
