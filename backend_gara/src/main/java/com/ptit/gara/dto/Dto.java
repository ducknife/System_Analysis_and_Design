package com.ptit.gara.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ptit.gara.model.Car;
import com.ptit.gara.model.Component;
import com.ptit.gara.model.ComponentDetail;
import com.ptit.gara.model.Customer;
import com.ptit.gara.model.Manager;
import com.ptit.gara.model.Service;
import com.ptit.gara.model.ServiceDetail;
import com.ptit.gara.model.ServiceSlip;
import com.ptit.gara.model.Slot;

public final class Dto {

    private Dto() {
    }

    public record LoginRequest(String username, String password) {
    }

    public record ManagerDTO(Integer userID, String employeeCode, String fullname) {
        public static ManagerDTO of(Manager m) {
            return new ManagerDTO(m.getUserID(), m.getEmployeeCode(), m.getFullname());
        }
    }

    public record CustomerDTO(Integer userID, String fullname, String phone, String email, String address) {
        public static CustomerDTO of(Customer c) {
            return new CustomerDTO(c.getUserID(), c.getFullname(), c.getPhone(), c.getEmail(), c.getAddress());
        }
    }

    public record CarDTO(Integer carID, String licensePlate, String brand, String model, Integer year) {
        public static CarDTO of(Car car) {
            return new CarDTO(car.getCarID(), car.getLicensePlate(), car.getBrand(), car.getModel(), car.getYear());
        }
    }

    public record AppointmentDTO(Integer appointmentID, Integer appointmentDetailID, Integer carID,
            String licensePlate, LocalDateTime time, String status) {
    }

    public record CustomerInfoDTO(CustomerDTO customer, List<CarDTO> cars, List<AppointmentDTO> appointments) {
    }

    public record NewCustomerDTO(CustomerDTO customer, CarDTO car) {
    }

    public record ReceiptRequest(Integer customerID, Integer carID, Integer appointmentDetailID, Integer managerID) {
    }

    public record ServiceDTO(Integer serviceID, String name, Double price, Double laborContent) {
        public static ServiceDTO of(Service s) {
            return new ServiceDTO(s.getServiceID(), s.getName(), s.getPrice(), s.getLaborContent());
        }
    }

    public record ComponentDTO(Integer componentID, String name, Double price, Integer inventoryQty) {
        public static ComponentDTO of(Component c) {
            return new ComponentDTO(c.getComponentID(), c.getName(), c.getPrice(), c.getInventoryQty());
        }
    }

    public record ServiceDetailDTO(Integer serviceID, String name, Double price, Double laborContent, Integer staffID) {
        public static ServiceDetailDTO of(ServiceDetail d) {
            return new ServiceDetailDTO(d.getService().getServiceID(), d.getService().getName(), d.getPrice(),
                    d.getLaborContent(), d.getStaff() == null ? null : d.getStaff().getUserID());
        }
    }

    public record ComponentDetailDTO(Integer componentID, String name, Integer qty, Double price) {
        public static ComponentDetailDTO of(ComponentDetail d) {
            return new ComponentDetailDTO(d.getComponent().getComponentID(), d.getComponent().getName(), d.getQty(),
                    d.getPrice());
        }
    }

    public record ServiceSlipDTO(Integer serviceSlipID, LocalDateTime time, String status, CustomerDTO customer,
            CarDTO car, List<ServiceDetailDTO> serviceDetails, List<ComponentDetailDTO> componentDetails) {
        public static ServiceSlipDTO of(ServiceSlip ss) {
            return new ServiceSlipDTO(ss.getServiceSlipID(), ss.getTime(), ss.getStatus(),
                    CustomerDTO.of(ss.getCustomer()), CarDTO.of(ss.getCar()),
                    ss.getListServiceDetail().stream().map(ServiceDetailDTO::of).toList(),
                    ss.getListComponentDetail().stream().map(ComponentDetailDTO::of).toList());
        }
    }

    public record AddServiceRequest(Integer serviceID) {
    }

    public record AddComponentRequest(Integer componentID, Integer qty) {
    }

    public record AssignStaffRequest(Integer staffID) {
    }

    public record ChooseSlotRequest(Integer slotID, Integer managerID) {
    }

    public record StaffDTO(Integer userID, String employeeCode, String fullname, String specialization, boolean busy) {
    }

    public record SlotDTO(Integer slotID, String location, String status) {
        public static SlotDTO of(Slot s) {
            return new SlotDTO(s.getSlotID(), s.getLocation(), s.getStatus());
        }
    }

    public record SalarySummaryDTO(Integer staffID, String employeeCode, String fullname, double totalLabor) {
    }

    public record StaffWorkDTO(Integer serviceSlipID, Integer serviceID, String licensePlate, String serviceName,
            Double laborContent, LocalDateTime finishedAt) {
        public static StaffWorkDTO of(ServiceDetail d) {
            return new StaffWorkDTO(d.getServiceSlip().getServiceSlipID(), d.getService().getServiceID(),
                    d.getServiceSlip().getCar().getLicensePlate(), d.getService().getName(), d.getLaborContent(),
                    d.getFinishedAt());
        }
    }

    public record CreateSalaryRequest(Integer month, Integer year, Double laborUnitPrice, Integer managerID) {
    }

    public record SalaryTableDTO(Integer salaryTableID, String employeeCode, String fullname, Double laborUnitPrice,
            double totalLabor, String paymentMethod, Boolean isReceived) {
    }

    public record PaymentMethodRequest(Integer salaryTableID, String paymentMethod) {
    }

    public record ReceivedRequest(Integer salaryTableID, Boolean isReceived) {
    }
}
