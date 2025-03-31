package vn.ITDE.outliers.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turkraft.springfilter.boot.Filter;

import vn.ITDE.outliers.domain.dto.ResultPaginationDTO;
import vn.ITDE.outliers.service.AccountService;
import vn.ITDE.outliers.domain.Account;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;

    public AccountController(AccountService accountService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create")
    public ResponseEntity<Account> createNewAccount(@RequestBody Account postManAccount) {
        String hashPassword = this.passwordEncoder.encode(postManAccount.getPassword());
        postManAccount.setPassword(hashPassword);
        Account newAccount = this.accountService.handleCreateAccount(postManAccount);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAccount);
    }

}