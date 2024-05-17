import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util"
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST /api/contacts', () => { 
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can create new contact', async() => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test", 
                email: "test@gmail.com", 
                phone: "085723048234"
            })

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("085723048234");
    })

    it('should reject if request is not valid', async() => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set('Authorization', 'test')
            .send({
                first_name: " ",
                last_name: "test", 
                email: "test.com", 
                phone: "085723048234352345234523452345345"
            })

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
})

describe('GET /api/contacts/contactId', () => { 
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set("Authorization", "test");
        
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    })

    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set("Authorization", "test");
        
        expect(result.status).toBe(404);
    })
})

describe('PUT /api/contacts/:contactId', () => { 
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can update existing contact', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "test1", 
                last_name: "test2", 
                email: "test@yahoo.com", 
                phone: "08809897894"
            });

        logger.info(result);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("test1");
        expect(result.body.data.last_name).toBe("test2");
        expect(result.body.data.email).toBe("test@yahoo.com");
        expect(result.body.data.phone).toBe("08809897894");
    })

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .put("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: "test1", 
                last_name: "test2", 
                email: "test@yahoo.com", 
                phone: "08809897894"
            });

        logger.info(result);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .put("/api/contacts/" + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "", 
                last_name: "", 
                email: "test@", 
                phone: ""
            });

        logger.info(result);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
})

describe('DELETE /api/contacts/:contactId', () => { 
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    it('should can delete contact', async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete("/api/contacts/" + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    })

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
            .delete("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test');

        logger.info(result);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    })
})