import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification modules
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null), // null means no DB in test env
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  it("accepts a valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      phone: "+237 674 000 000",
      subject: "Demande d'information",
      message: "Je souhaite en savoir plus sur vos programmes de conservation.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email in contact form", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        firstName: "Jean",
        lastName: "Dupont",
        email: "not-an-email",
        subject: "Test",
        message: "Message de test valide.",
      })
    ).rejects.toThrow();
  });

  it("rejects message that is too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean@example.com",
        subject: "Test",
        message: "Court",
      })
    ).rejects.toThrow();
  });
});

describe("registration.submit", () => {
  it("accepts a valid volunteer registration", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.submit({
      type: "benevole",
      firstName: "Marie",
      lastName: "Ngono",
      email: "marie.ngono@example.com",
      phone: "+237 689 000 000",
      city: "Yaoundé",
      country: "Cameroun",
      motivation: "Je veux contribuer à la protection de l'environnement au Cameroun.",
      skills: "Biologie, communication",
      availability: "Week-ends",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a valid partner registration", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.registration.submit({
      type: "partenaire",
      firstName: "Paul",
      lastName: "Martin",
      email: "paul.martin@ong.org",
      organization: "ONG Verte",
      partnerType: "ONG / Association",
      city: "Paris",
      country: "France",
      motivation: "Nous souhaitons établir un partenariat stratégique pour la conservation.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid type in registration", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.registration.submit({
        type: "invalid" as "benevole",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
      })
    ).rejects.toThrow();
  });
});
