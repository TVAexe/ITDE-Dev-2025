package vn.ITDE.outliers.service;
import java.util.Collections;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component("accountDeatilsService")
public class AccountDeatilsCustom implements UserDetailsService {

    private final AccountService accountService;

    public AccountDeatilsCustom(AccountService accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        vn.ITDE.outliers.domain.Account account = this.accountService.handleGetAccountByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("Username/password không hợp lệ");
        }

        return new User(
                account.getUsername(),
                account.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + account.getRole())));

    }

}