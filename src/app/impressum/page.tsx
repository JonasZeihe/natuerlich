// src/app/impressum/page.tsx
'use client'

import Link from 'next/link'
import styled from 'styled-components'
import Section from '@/components/primitives/Section'
import Stack from '@/components/primitives/Stack'
import Surface from '@/components/primitives/Surface'
import Typography from '@/design/typography'

const ImpressumPage = () => (
  <Section
    ariaLabel="Impressum und Datenschutz"
    container="narrow"
    variant="body"
    rhythm="spacious"
    tone="default"
  >
    <PageFlow>
      <Header>
        <Typography as="h1" variant="h1" cadence="dense" measure="title">
          Impressum & Datenschutz
        </Typography>

        <Typography
          as="p"
          variant="subtitle"
          tone="soft"
          cadence="open"
          measure="prose"
        >
          Rechtliche Angaben, Datenschutz und Hinweise zur Nutzung dieser
          Website.
        </Typography>
      </Header>

      <Content>
        <LegalBlock aria-labelledby="anbieter">
          <LegalStack>
            <Typography
              as="h2"
              id="anbieter"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Diensteanbieter nach § 5 DDG und verantwortliche Stelle nach Art.
              4 Nr. 7 DSGVO
            </Typography>

            <Address>
              <Typography as="p" variant="body" cadence="open">
                Jonas Zeihe
                <br />
                Weinbergstraße 2
                <br />
                94424 Arnstorf
                <br />
                Deutschland
              </Typography>
            </Address>

            <Typography as="p" variant="body" cadence="open">
              E-Mail:{' '}
              <TextLink href="mailto:jonaszeihe@gmail.com">
                jonaszeihe@gmail.com
              </TextLink>
            </Typography>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="verantwortlich">
          <LegalStack>
            <Typography
              as="h2"
              id="verantwortlich"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Verantwortlich für Inhalte nach § 18 Abs. 2 MStV
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Jonas Zeihe, Anschrift wie oben
            </Typography>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="datenschutz">
          <LegalStack>
            <Typography
              as="h2"
              id="datenschutz"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Datenschutz
            </Typography>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Grundsätze
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Diese Website kann grundsätzlich ohne Angabe personenbezogener
                Daten genutzt werden. Es werden keine Tracking-Cookies gesetzt,
                keine Webanalyse eingesetzt und keine Profilbildung vorgenommen.
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Art der Website
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Bei dieser Website handelt es sich um eine statisch
                bereitgestellte Website auf Basis von Next.js. Sie dient der
                Darstellung meiner Arbeit, der Bereitstellung von
                Kontaktmöglichkeiten und rechtlichen Informationen.
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Hosting
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Diese Website wird auf Render betrieben. Beim Aufruf der Seiten
                verarbeitet der Hoster technisch notwendige Server-Logdaten,
                insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
                angeforderte Ressource, Referrer, Browsertyp und Betriebssystem,
                um die Website auszuliefern und die Sicherheit sowie Stabilität
                des Betriebs zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1
                lit. f DSGVO.
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Weitere Informationen:{' '}
                <TextLink
                  href="https://render.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Datenschutzerklärung von Render
                </TextLink>
                .
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Internationale Datenübermittlung
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Render ist ein Anbieter mit Sitz in den USA. Je nach technischer
                Ausgestaltung können Daten, insbesondere Server-Logdaten, auch
                in den USA verarbeitet werden. Die Verarbeitung erfolgt auf
                Grundlage geeigneter Garantien gemäß Art. 46 DSGVO, soweit dies
                erforderlich ist.
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Kontaktaufnahme per E-Mail
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Bei einer Kontaktaufnahme per E-Mail werden die übermittelten
                Daten ausschließlich zur Bearbeitung der Anfrage verwendet.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern die
                Anfrage auf den Abschluss oder die Durchführung eines Vertrags
                gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Die Daten
                werden gelöscht, sobald die Anfrage abgeschlossen ist und keine
                gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Lokale Speicherung im Browser
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Soweit diese Website technische Einstellungen lokal speichert,
                erfolgt dies ausschließlich im Browser des verwendeten
                Endgeräts. Eine zentrale Speicherung solcher Informationen
                findet nicht statt.
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Ihre Rechte
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
                Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
                Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten
                nach Maßgabe der Art. 15 bis 21 DSGVO. Außerdem haben Sie das
                Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
                beschweren. Zur Geltendmachung Ihrer Rechte genügt eine formlose
                Mitteilung an{' '}
                <TextLink href="mailto:jonaszeihe@gmail.com">
                  jonaszeihe@gmail.com
                </TextLink>
                .
              </Typography>
            </Subsection>

            <Subsection>
              <Typography as="h3" variant="subtitle" color="primary">
                Sicherheit
              </Typography>
              <Typography as="p" variant="body" tone="soft" cadence="open">
                Die Übertragung dieser Website erfolgt verschlüsselt mittels
                HTTPS / TLS, soweit der verwendete Browser dies unterstützt.
              </Typography>
            </Subsection>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="haftung-inhalte">
          <LegalStack>
            <Typography
              as="h2"
              id="haftung-inhalte"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Haftung für Inhalte
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Ich bin jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </Typography>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="haftung-links">
          <LegalStack>
            <Typography
              as="h2"
              id="haftung-links"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Haftung für Links
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Diese Website enthält Links zu externen Websites Dritter, auf
              deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte
              ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
              Bei Bekanntwerden von Rechtsverletzungen werden entsprechende
              Links entfernt.
            </Typography>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="urheberrecht">
          <LegalStack>
            <Typography
              as="h2"
              id="urheberrecht"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Urheberrecht und Medien
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Die durch mich erstellten Inhalte und Werke auf dieser Website
              unterliegen dem deutschen Urheberrecht. Vervielfältigung,
              Bearbeitung, Verbreitung und Verwertung außerhalb der Grenzen des
              Urheberrechts bedürfen der vorherigen Zustimmung. Downloads und
              Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
              Gebrauch gestattet.
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Soweit Inhalte auf dieser Seite nicht von mir erstellt wurden,
              werden die Urheberrechte Dritter beachtet. Sollten Sie dennoch auf
              eine Urheberrechtsverletzung aufmerksam werden, informieren Sie
              mich bitte.
            </Typography>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="streitbeilegung">
          <LegalStack>
            <Typography
              as="h2"
              id="streitbeilegung"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Online-Streitbeilegung / Verbraucherstreitbeilegung
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung bereit:{' '}
              <TextLink
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </TextLink>
              . Ich bin weder verpflichtet noch bereit, an einem
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </Typography>
          </LegalStack>
        </LegalBlock>

        <LegalBlock aria-labelledby="stand">
          <LegalStack>
            <Typography
              as="h2"
              id="stand"
              variant="h2"
              cadence="dense"
              measure="title"
            >
              Stand
            </Typography>

            <Typography as="p" variant="body" tone="soft" cadence="open">
              Mai 2026
            </Typography>
          </LegalStack>
        </LegalBlock>
      </Content>

      <Actions aria-label="Navigation">
        <ActionLink href="/">Zurück zur Website</ActionLink>
      </Actions>
    </PageFlow>
  </Section>
)

const PageFlow = styled(Stack)`
  width: 100%;
  gap: ${({ theme }) => theme.layout.flow.region};
`

const Header = styled(Stack)`
  max-width: 58rem;
  gap: ${({ theme }) => theme.layout.flow.block};
`

const Content = styled(Stack)`
  width: 100%;
  gap: ${({ theme }) => theme.layout.flow.cluster};
`

const LegalBlock = styled(Surface).attrs({
  tone: 'quiet',
  movement: 'arrival',
  radius: 'large',
  padding: 'lg',
})`
  width: 100%;
`

const LegalStack = styled(Stack)`
  gap: ${({ theme }) => theme.layout.flow.block};
`

const Subsection = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.layout.flow.text};
`

const Address = styled.address`
  font-style: normal;
`

const TextLink = styled(Link)`
  color: ${({ theme }) => theme.color.text.link};
  text-decoration-color: ${({ theme }) => theme.color.text.link};
  text-underline-offset: 0.18em;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.color.text.linkHover};
    text-decoration-color: currentColor;
  }
`

const Actions = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.layout.flow.text};
`

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing(3.2)};
  padding-inline: ${({ theme }) => theme.spacing(1.15)};
  border: 1px solid ${({ theme }) => theme.color.border.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  color: ${({ theme }) => theme.color.text.soft};
  background: transparent;
  text-decoration: none;
  transition: ${({ theme }) => theme.motion.css.interactive.control};

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.color.surface.chrome};
    border-color: ${({ theme }) => theme.color.border.strong};
    color: ${({ theme }) => theme.color.text.primary};
    text-decoration: none;
    transform: translateY(
      calc(${({ theme }) => theme.motion.foundations.distances.nudge} * -1)
    );
  }

  &:active {
    transform: translateY(0);
  }

  @media ${({ theme }) => theme.motion.reduced.media} {
    transition: none;
  }
`

export default ImpressumPage
