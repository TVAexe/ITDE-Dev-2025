package vn.ITDE.outliers.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import vn.ITDE.outliers.domain.Student;
import vn.ITDE.outliers.repository.UserRepository;

@Service
public class UserService {

   private final UserRepository userRepository;

   public UserService(UserRepository userRepository) {
       this.userRepository = userRepository;
   }

   public Student handleCreateUser(Student account) {
       return this.userRepository.save(account);
   }

   public void handleDeleteUser(String id) {
       this.userRepository.deleteById(id);
   }

   public Student fetchUserById(String id) {
       Optional<Student> userOptional = this.userRepository.findById(id);
       if (userOptional.isPresent()) {
           return userOptional.get();
       }
       return null;
   }

   public List<Student> fetchAllUser() {
       return this.userRepository.findAll();
   }

   public Student handleUpdateUser(Student reqAccount) {
       Student currentAccount = this.fetchUserById(reqAccount.getId());
       if (currentAccount != null) {
           currentAccount.setEmail(reqAccount.getEmail());
           currentAccount.setName(reqAccount.getName());
           currentAccount.setPassword(reqAccount.getPassword());
           // update
           currentAccount = this.userRepository.save(currentAccount);
       }
       return currentAccount;
   }

   public Student handleGetUserByUsername(String username) {
       return this.userRepository.findByEmail(username);
   }
}