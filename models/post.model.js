module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        status: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
        },
    });
    return Post;
};