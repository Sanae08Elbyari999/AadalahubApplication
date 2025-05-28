package BackEnd.AdalaHub.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    private String titre = "Maitre";

    @Column(name = "prenom", nullable = false)
    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50)
    private String prenom;

    @Column(name = "nom", nullable = false)
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50)
    private String nom;

    @Column(name = "email", unique = true, nullable = false)
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Email invalide")
    private String email;

    @Column(name = "password", nullable = false)
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 8, message = "Minimum 8 caractères")
    private String password;

    // Infos complémentaires
    @Column(name = "specialites", nullable = false)
    @NotBlank(message = "Les spécialités sont obligatoires")
    private String specialites;

    @Column(name = "adresse_cabinet", nullable = false)
    @NotBlank(message = "L'adresse du cabinet est obligatoire")
    private String officeAddress;

    @Column(name = "telephone_cabinet", nullable = false)
    @NotBlank(message = "Le téléphone du cabinet est obligatoire")
    @Pattern(regexp = "^0[5-7][0-9]{8}$", message = "Numéro marocain invalide")
    private String officeTelephone;

    @Column(name = "telephone_personnel", nullable = false)
    @NotBlank(message = "Le téléphone personnel est obligatoire")
    @Pattern(regexp = "^0[5-7][0-9]{8}$", message = "Numéro marocain invalide")
    private String telephonePersonnel;

    @Column(name = "pays", nullable = false)
    private String pays = "Maroc";

    @Column(name = "description", length = 1000)
    @Size(max = 1000, message = "Description trop longue")
    private String description;

    @Column(name = "certifie", nullable = false)
    private boolean certifie = false;

    @Column(name = "disponible_en_ligne")
    private boolean disponibleEnLigne = true;

    @Column(name = "disponible_au_cabinet")
    private boolean disponibleAuCabinet = true;

    @Column(nullable = false)
    private String ville;
    @Column(length = 500)
    private String services;




    public AvocatDetails() {}

    public AvocatDetails(String titre, String prenom, String nom, String email, String password,
                         String specialites, String officeAddress, String officeTelephone,
                         String telephonePersonnel, String pays, String description, boolean certifie,
                         boolean disponibleEnLigne, boolean disponibleAuCabinet, String ville, String services) {

        this.titre = titre;
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.password = password;
        this.specialites = specialites;
        this.officeAddress = officeAddress;
        this.officeTelephone = officeTelephone;
        this.telephonePersonnel = telephonePersonnel;
        this.pays = pays;
        this.description = description;
        this.certifie = certifie;
        this.disponibleEnLigne = disponibleEnLigne;
        this.disponibleAuCabinet = disponibleAuCabinet;
        this.ville = ville;
        this.services = services;
    }






    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    @JsonProperty("title")
    public String getTitre() { return titre; }

    @JsonProperty("title")
    public void setTitre(String titre) { this.titre = titre; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getSpecialites() { return specialites; }
    public void setSpecialites(String specialites) { this.specialites = specialites; }

    public String getOfficeAddress() { return officeAddress; }
    public void setOfficeAddress(String adresseCabinet) { this.officeAddress = adresseCabinet; }

    public String getOfficeTelephone() { return officeTelephone; }
    public void setOfficeTelephone(String telephoneCabinet) { this.officeTelephone = telephoneCabinet; }

    public String getTelephonePersonnel() { return telephonePersonnel; }
    public void setTelephonePersonnel(String telephonePersonnel) { this.telephonePersonnel = telephonePersonnel; }

    public String getPays() { return pays; }
    public void setPays(String pays) { this.pays = pays; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isCertifie() { return certifie; }
    public void setCertifie(boolean certifie) { this.certifie = certifie; }

    public boolean isDisponibleEnLigne() { return disponibleEnLigne; }
    public void setDisponibleEnLigne(boolean disponibleEnLigne) { this.disponibleEnLigne = disponibleEnLigne; }

    public boolean isDisponibleAuCabinet() { return disponibleAuCabinet; }
    public void setDisponibleAuCabinet(boolean disponibleAuCabinet) { this.disponibleAuCabinet = disponibleAuCabinet; }

    public String getVille() {
        return ville;
    }

    public String getServices() {
        return services;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public void setServices(String services) {
        this.services = services;
    }
}