package com.mdd.API.Controller;

import com.mdd.API.model.Theme;
import com.mdd.API.Repository.ThemeRepository;
import com.mdd.API.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/themes")
public class ThemeController {

    @Autowired
    private ThemeRepository themeRepository;

    @GetMapping
    public List<Theme> getAllThemes() {
        return themeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Theme getThemeById(@PathVariable Long id) {
        return themeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Theme not found with id: " + id));
    }

    @PostMapping
    public Theme createTheme(@RequestBody Theme theme) {
        return themeRepository.save(theme);
    }

    @PutMapping("/{id}")
    public Theme updateTheme(@PathVariable Long id, @RequestBody Theme themeDetails) {
        Theme theme = themeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Theme not found with id: " + id));
        theme.setTitle(themeDetails.getTitle());
        theme.setDescription(themeDetails.getDescription());
        return themeRepository.save(theme);
    }

    @DeleteMapping("/{id}")
    public void deleteTheme(@PathVariable Long id) {
        themeRepository.deleteById(id);
    }
}
