//package vn.ITDE.outliers.controller;
//
//import java.util.List;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import vn.ITDE.outliers.domain.Account;
//import vn.ITDE.outliers.service.UserService;
//import vn.ITDE.outliers.ultil.error.IdInvalidException;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    private final UserService userService;
//    private final PasswordEncoder passwordEncoder;
//
//    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
//        this.userService = userService;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @PostMapping
//    public ResponseEntity<Account> createNewUser(@RequestBody Account account) {
//        account.setPassword(passwordEncoder.encode(account.getPassword()));
//        Account createdAccount = userService.handleCreateUser(account);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable("id") long id) throws IdInvalidException {
//        if (id >= 1500) {
//            throw new IdInvalidException("Id không được lớn hơn 1500");
//        }
//        userService.handleDeleteUser(id);
//        return ResponseEntity.ok("User deleted successfully");
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Account> getUserById(@PathVariable("id") long id) {
//        Account account = userService.fetchUserById(id);
//        return ResponseEntity.status(HttpStatus.OK).body(account);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Account>> getAllUsers() {
//        List<Account> users = userService.fetchAllUser();
//        return ResponseEntity.status(HttpStatus.OK).body(users);
//    }
//
//    @PutMapping
//    public ResponseEntity<Account> updateUser(@RequestBody Account account) {
//        Account updatedAccount = userService.handleUpdateUser(account);
//        return ResponseEntity.ok(updatedAccount);
//    }
//}