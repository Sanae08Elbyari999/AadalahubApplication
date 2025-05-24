package BackEnd.AdalaHub.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
@Table(name = "avocat_details")
public class AvocatDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "titre", nullable = false)
    @NotBlank(message = "Le titre est obligatoire")
    private String titre; // 'Dr.' ou 'Maitre'

    @Column(name = "prenom", nullable = false)
    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50)
    private String prenom; // firstName dans React

    @Column(name = "nom", nullable = false)
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50)
    private String nom; // lastName dans React

    @Column(name = "email", unique = true, nullable = false)
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Email invalide")
    private String email;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Minimum 8 caractères")
    private String password;

    @Column(name = "google_account")
    private boolean googleAccount = false;

    @Column(name = "disponible_en_ligne")
    private boolean disponibleEnLigne = true;

    @Column(name = "disponible_au_cabinet")
    private boolean disponibleAuCabinet = true;

    public AvocatDetails() {}


    public static AvocatDetails fromFormData(String titre, String prenom, String nom,
                                             String email, String password) {
        AvocatDetails avocat = new AvocatDetails();
        avocat.setTitre(titre);
        avocat.setPrenom(prenom);
        avocat.setNom(nom);
        avocat.setEmail(email);
        avocat.setPassword(password);
        return avocat;
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public boolean isGoogleAccount() { return googleAccount; }
    public void setGoogleAccount(boolean googleAccount) { this.googleAccount = googleAccount; }

    public boolean isDisponibleEnLigne() { return disponibleEnLigne; }
    public void setDisponibleEnLigne(boolean disponibleEnLigne) { this.disponibleEnLigne = disponibleEnLigne; }

    public boolean isDisponibleAuCabinet() { return disponibleAuCabinet; }
    public void setDisponibleAuCabinet(boolean disponibleAuCabinet) { this.disponibleAuCabinet = disponibleAuCabinet; }
}
