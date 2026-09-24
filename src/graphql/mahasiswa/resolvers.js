const { Op } = require('sequelize');
const Mahasiswa = require('../../models/mahasiswa/mahasiswaModel');

const resolvers = {
    // QUERY
    Query: {
        // GET SEMUA DATA
        mahasiswa: async () => {
            return await Mahasiswa.findAll({
                order: [
                    ['nama', 'ASC']
                ]
            });
        },

        // CARI DATA BERDASARKAN ID
        mahasiswaById: async (_, { id }) => {
            const data = await Mahasiswa.findOne({
                where: {
                    id_mahasiswa: id
                }
            });
            if (!data) {
                throw new Error('Mahasiswa tidak ditemukan');
            }
            return data;
        },

        // CARI DATA BERDASARKAN NIM ATAU NAMA
        cariMahasiswa: async (_, { keyword }) => {
            return await Mahasiswa.findAll({
                where: {
                    [Op.or]: [
                        {
                            nim: {
                                [Op.like]: `%${keyword}%`
                            }
                        },
                        {
                            nama: {
                                [Op.like]: `%${keyword}%`
                            }
                        }
                    ]
                },
                order: [
                    ['nama', 'ASC']
                ]
            });
        }
    },

    // MUTATION
    Mutation: {
        // TAMBAH
        tambahMahasiswa: async (_, { input }) => {
            const waktu = new Date();
            return await Mahasiswa.create({
                ...input,
                create_at: waktu,
                update_at: waktu,
                delete_at: null
            });
        },

        // EDIT
        updateMahasiswa: async (_, { id, input }) => {
            const data = await Mahasiswa.findOne({
                where: {
                    id_mahasiswa: id
                }
            });

            if (!data) {
                throw new Error('Mahasiswa tidak ditemukan');
            }

            await data.update({
                ...input,
                update_at: new Date()
            });

            return data;
        },

        // SOFT DELETE
        deleteMahasiswa: async (_, { id }) => {
            const data = await Mahasiswa.findOne({
                where: {
                    id_mahasiswa: id
                }
            });

            if (!data) {
                throw new Error('Mahasiswa tidak ditemukan');
            }

            await data.update({
                delete_at: new Date(),
                update_at: new Date()
            });

            return data;
        },

        // RESTORE
        restoreMahasiswa: async (_, { id }) => {
            const data = await Mahasiswa.findOne({
                where: {
                    id_mahasiswa: id
                }
            });

            if (!data) {
                throw new Error('Mahasiswa tidak ditemukan');
            }

            await data.update({
                delete_at: null,
                update_at: new Date()
            });

            return data;
        }
    }
};

module.exports = resolvers;