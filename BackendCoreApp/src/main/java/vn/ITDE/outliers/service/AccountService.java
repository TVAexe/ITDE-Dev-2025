package vn.ITDE.outliers.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.ITDE.outliers.domain.Account;
import vn.ITDE.outliers.domain.dto.Meta;
import vn.ITDE.outliers.domain.dto.ResultPaginationDTO;
import vn.ITDE.outliers.repository.AccountRepository;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account handleCreateAccount(Account account) {
        return this.accountRepository.save(account);
    }

    public void handleDeleteAccount(String username) {
        this.accountRepository.deleteById(username);
    }

    public ResultPaginationDTO fetchAllAccount(Specification<Account> specification, Pageable pageable) {
        Page<Account> page = this.accountRepository.findAll(specification, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(page.getTotalPages());
        mt.setTotal(page.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(page.getContent());
        return rs;
    }

    public Account fetchAccountById(String username) {
        Optional<Account> accountOptional = this.accountRepository.findById(username);
        if (accountOptional.isPresent()) {
            return accountOptional.get();
        }
        return null;
    }

    public Account handleUpdateAccount(Account reqAccount) {
        Account currentAccount = this.fetchAccountById(reqAccount.getUsername());
        if (currentAccount != null) {
            currentAccount.setPassword(reqAccount.getPassword());
            currentAccount.setRole(reqAccount.getRole());
            // update
            currentAccount = this.accountRepository.save(currentAccount);
        }
        return currentAccount;
    }
    
}
