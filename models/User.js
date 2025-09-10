const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    avatar_url: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://avatar.iran.liara.run/public',
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
});