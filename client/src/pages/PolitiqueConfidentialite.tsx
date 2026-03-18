import Layout from "@/components/Layout";
import { ShieldCheck } from "lucide-react";

export default function PolitiqueConfidentialite() {
  return (
    <Layout>
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-amance-green/10 text-amance-green">
              <ShieldCheck size={16} />
              Confidentialité & Données
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-amance-blue mb-6 font-heading">
              Politique de Confidentialité
            </h1>
            <p className="text-xl text-gray-600 font-sans">
              Comment nous protégeons et gérons vos données personnelles.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100 prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-p:font-sans">
            <p className="lead text-xl text-gray-700 font-semibold mb-8">
              L'association AMANCE accorde une grande importance à la protection de la vie privée et des données personnelles de ses utilisateurs, donateurs et partenaires.
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">1. Collecte des données</h2>
            <p>
              Nous collectons les données personnelles que vous nous fournissez volontairement lors de :
            </p>
            <ul>
              <li>L'utilisation de notre formulaire de contact</li>
              <li>L'inscription à notre newsletter</li>
              <li>La réalisation d'un don</li>
              <li>Votre inscription en tant que bénévole</li>
            </ul>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">2. Utilisation des données</h2>
            <p>
              Les informations recueillies sont exclusivement utilisées pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de renseignements</li>
              <li>Gérer vos dons et éditer vos reçus fiscaux</li>
              <li>Vous informer de nos actions et actualités (si vous y avez consenti)</li>
              <li>Organiser nos missions bénévoles</li>
            </ul>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">3. Partage des données</h2>
            <p>
              Nous nous engageons à ne <strong>jamais</strong> vendre, louer ou échanger vos données personnelles à des tiers à des fins commerciales. Vos données peuvent être partagées uniquement avec nos prestataires techniques (hébergement, plateforme de dons) qui sont soumis à de strictes obligations de confidentialité.
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">4. Vos droits</h2>
            <p>
              Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données personnelles.
              <br />
              Pour exercer ces droits, vous pouvez nous contacter à tout moment à l'adresse suivante : <strong>infos@amance.org</strong>
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">5. Sécurité</h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité et la confidentialité de vos données contre tout accès non autorisé, altération, divulgation ou destruction.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
