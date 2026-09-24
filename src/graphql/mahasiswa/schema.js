const typeDefs = `#graphql
    type Mahasiswa {
        id_mahasiswa: ID!
        nim: String!
        nama: String!
        id_jenis_kelamin: String!
        tempat_lahir: String
        tanggal_lahir: String
        alamat: String
        no_hp: String
        email: String
        id_program_studi: String
        id_angkatan: String
        create_at: String
        update_at: String
        delete_at: String
    }

    input MahasiswaInput {
        nim: String!
        nama: String!
        id_jenis_kelamin: String!
        tempat_lahir: String
        tanggal_lahir: String
        alamat: String
        no_hp: String
        email: String
        id_program_studi: String
        id_angkatan: String
    }

    extend type Query {
        mahasiswa: [Mahasiswa]
        mahasiswaById(id: ID!): Mahasiswa
        cariMahasiswa(keyword: String!): [Mahasiswa]
    }

    extend type Mutation {
        tambahMahasiswa(input: MahasiswaInput!): Mahasiswa
        updateMahasiswa(
            id: ID!
            input: MahasiswaInput!
        ): Mahasiswa
        deleteMahasiswa(id: ID!): Mahasiswa
        restoreMahasiswa(id: ID!): Mahasiswa
    }
`;

module.exports = typeDefs;