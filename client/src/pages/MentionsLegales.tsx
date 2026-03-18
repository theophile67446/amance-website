import Layout from "@/components/Layout";
import { Scale } from "lucide-react";

export default function MentionsLegales() {
  return (
    <Layout>
      <section className="py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 bg-amance-blue/10 text-amance-blue">
              <Scale size={16} />
              Informations Légales
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-amance-blue mb-6 font-heading">
              Mentions Légales
            </h1>
            <p className="text-xl text-gray-600 font-sans">
              Informations générales concernant notre site web et notre association.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 sm:p-12 border border-gray-100 prose prose-lg prose-gray max-w-none prose-headings:font-heading prose-p:font-sans">
            <h2 className="text-2xl font-bold text-amance-blue mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>AMANCE</strong> est édité par l'association <em>Angel Mary Association for the Needy and Conservation Education</em>, association à but non lucratif enregistrée au Cameroun.
            </p>
            <ul>
              <li><strong>Siège social :</strong> Buea, Division du Fako, Région du Sud-Ouest, Cameroun</li>
              <li><strong>Téléphone :</strong> +237 674 943 368 / +237 689 314 418</li>
              <li><strong>Email de contact :</strong> infos@amance.org</li>
            </ul>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">2. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève des législations camerounaises et internationales sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique ou papier quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">3. Limitation de responsabilité</h2>
            <p>
              AMANCE s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
              Toutefois, AMANCE ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site.
            </p>

            <h2 className="text-2xl font-bold text-amance-blue mt-8 mb-4">4. Hébergement</h2>
            <p>
              Ce site est hébergé par des prestataires tiers garantissant la sécurité et la disponibilité des données. Pour toute question technique concernant l'hébergement, veuillez nous contacter à l'adresse fournie ci-dessus.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
