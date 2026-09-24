const { Op } = require('sequelize');
const Angkatan = require('../../models/angkatan/angkatanModel');

const resolvers = {
    // QUERY
    Query: {
        // GET SEMUA DATA
        angkatan: async () => {
            return await Angkatan.findAll({
                order: [
                    ['tahun_ajaran', 'ASC']
                ]
            });
        },

        // CARI DATA BERDASARKAN ID
        angkatanById: async (_, { id }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id
                }
            });
            if (!data) {
                throw new Error('Angkatan tidak ditemukan');
            }
            return data;
        },

        // CARI DATA BERDASARKAN TAHUN AJARAN
        cariAngkatan: async (_, { keyword }) => {
            return await Angkatan.findAll({
                where: {
                    tahun_ajaran: {
                        [Op.like]: `%${keyword}%`
                    }
                },
                order: [
                    ['tahun_ajaran', 'ASC']
                ]
            });
        }
    },

    // MUTATION
    Mutation: {
        // TAMBAH
        tambahAngkatan: async (_, { input }) => {
            const waktu = new Date();
            return await Angkatan.create({
                ...input,
                create_at: waktu,
                update_at: waktu,
                delete_at: null
            });
        },

        // EDIT
        updateAngkatan: async (_, { id, input }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id
                }
            });

            if (!data) {
                throw new Error('Angkatan tidak ditemukan');
            }

            await data.update({
                ...input,
                update_at: new Date()
            });

            return data;
        },

        // SOFT DELETE
        deleteAngkatan: async (_, { id }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id
                }
            });

            if (!data) {
                throw new Error('Angkatan tidak ditemukan');
            }

            await data.update({
                delete_at: new Date(),
                update_at: new Date()
            });

            return data;
        },

        // RESTORE
        restoreAngkatan: async (_, { id }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id
                }
            });

            if (!data) {
                throw new Error('Angkatan tidak ditemukan');
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