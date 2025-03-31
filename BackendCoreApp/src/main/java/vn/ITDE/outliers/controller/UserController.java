package vn.ITDE.outliers.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.service.UserService;
import vn.ITDE.outliers.ultil.error.IdInvalidException;

@RestController
@RequestMapping("/users")
public class UserController {

   private final UserService userService;
   private final PasswordEncoder passwordEncoder;

   public UserController(UserService userService, PasswordEncoder passwordEncoder) {
       this.userService = userService;
       this.passwordEncoder = passwordEncoder;
   }

   @PostMapping
   public ResponseEntity<Student> createNewUser(@RequestBody Student student) {
       student.setPassword(passwordEncoder.encode(student.getPassword()));
       Student createdStudent = userService.handleCreateUser(student);
       return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
       userService.handleDeleteUser(id);
       return ResponseEntity.ok("User deleted successfully");
   }

   @GetMapping("/{id}")
   public ResponseEntity<Student> getUserById(@PathVariable("id") String id) {
       Student student = userService.fetchUserById(id);
       return ResponseEntity.status(HttpStatus.OK).body(student);
   }

   @GetMapping
   public ResponseEntity<List<Student>> getAllUsers() {
       List<Student> students = userService.fetchAllUser();
       return ResponseEntity.status(HttpStatus.OK).body(students);
   }

   @PutMapping
   public ResponseEntity<Student> updateUser(@RequestBody Student student) {
       Student updatedStudent = userService.handleUpdateUser(student);
       return ResponseEntity.ok(updatedStudent);
   }
}