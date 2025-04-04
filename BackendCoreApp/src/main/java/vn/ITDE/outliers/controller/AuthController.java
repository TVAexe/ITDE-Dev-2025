package vn.ITDE.outliers.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import vn.ITDE.outliers.domain.Account;
import vn.ITDE.outliers.domain.dto.LoginDTO;
import vn.ITDE.outliers.domain.dto.ResLoginDTO;
import vn.ITDE.outliers.ultil.SecurityUtil;
import vn.ITDE.outliers.repository.AccountRepository;

@RestController
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final vn.ITDE.outliers.ultil.SecurityUtil securityUtil;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody LoginDTO loginDto) {
        // Nạp input gồm username/password vào Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());

        // xác thực người dùng => cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // create a token
        String access_token = this.securityUtil.createToken(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO res = new ResLoginDTO();
        res.setAccessToken(access_token);
        return ResponseEntity.ok().body(res);
    }

    // @PostMapping("/register")
    // public ResponseEntity<String> register(@Valid @RequestBody Account account) {
    // // Kiểm tra xem username đã tồn tại chưa
    // if (accountRepository.existsById(account.getUsername())) {
    //     return ResponseEntity.badRequest().body("Username đã tồn tại");
    // }

    // // Mã hóa mật khẩu trước khi lưu
    // account.setPassword(passwordEncoder.encode(account.getPassword()));

    // // Lưu tài khoản vào cơ sở dữ liệu
    // accountRepository.save(account);

    // return ResponseEntity.ok("Đăng ký tài khoản thành công");
}
