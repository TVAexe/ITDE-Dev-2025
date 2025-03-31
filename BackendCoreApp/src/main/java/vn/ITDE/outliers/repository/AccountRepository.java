package vn.ITDE.outliers.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import vn.ITDE.outliers.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, String>, JpaSpecificationExecutor<Account> {
    // JpaRepository đã cung cấp các phương thức cơ bản như existsById, findById, save, deleteById, v.v.
    Account findByUsername(String username);
}