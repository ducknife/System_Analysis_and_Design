package com.ptit.gara.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Car;
import com.ptit.gara.model.Customer;

@Repository
public class CarDAO extends DAO {

    public List<Car> findCarsOfCustomer(Customer c) {
        return em.createQuery("select car from Car car where car.customer = :customer order by car.carID", Car.class)
                .setParameter("customer", c)
                .getResultList();
    }

    public Car addCar(Car car) {
        em.persist(car);
        return car;
    }

    public boolean hasLicensePlate(String licensePlate) {
        return !em.createQuery("select car from Car car where car.licensePlate = :plate", Car.class)
                .setParameter("plate", licensePlate)
                .getResultList().isEmpty();
    }
}
