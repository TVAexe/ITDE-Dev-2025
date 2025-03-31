package vn.ITDE.outliers.service;
import java.util.Collections;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import vn.ITDE.outliers.domain.Student;

// import vn.lehuuchinh.jobhunter.util.error.IdInvalidException;

@Component("userDetailsService")
public class UserDetailsCustom implements UserDetailsService {

   private final UserService userService;

   public UserDetailsCustom(UserService userService) {
       this.userService = userService;
   }

   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Student account = this.userService.handleGetUserByUsername(username);
       if (account == null) {
           throw new UsernameNotFoundException("Username/password không hợp lệ");
       }

       return new User(
               account.getEmail(),
               account.getPassword(),
               Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));

   }

}
