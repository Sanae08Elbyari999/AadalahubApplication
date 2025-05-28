package BackEnd.AdalaHub.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TestController.class)
public class TestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGet() throws Exception {
        mockMvc.perform(get("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string(" GET réussi !"));
    }

    @Test
    public void testPost() throws Exception {
        mockMvc.perform(post("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string("POST réussi !"));
    }

    @Test
    public void testPut() throws Exception {
        mockMvc.perform(put("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string("PUT réussi !"));
    }

    @Test
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/test"))
                .andExpect(status().isOk())
                .andExpect(content().string("DELETE réussi !"));
    }
}
