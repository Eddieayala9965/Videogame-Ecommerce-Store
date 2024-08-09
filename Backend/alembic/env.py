from logging.config import fileConfig
import asyncio

from sqlalchemy import pool
from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base

from alembic import context
from app.db.models.user import User
from app.db.models.product import Product
from app.db.models.order import Order
from app.db.models.review import Review
from app.core.config import settings

# Interpret the config file for Python logging.
fileConfig(context.config.config_file_name)

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Set the sqlalchemy.url from settings
config.set_main_option('sqlalchemy.url', settings.DATABASE_URL)

# Create the Base class
Base = declarative_base()

# Add your model's MetaData object here for 'autogenerate' support
# Ensure all models are imported so that they are registered with the Base
target_metadata = Base.metadata

# Define models
User.__table__.metadata = Base.metadata
Product.__table__.metadata = Base.metadata
Order.__table__.metadata = Base.metadata
Review.__table__.metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = create_async_engine(
        config.get_main_option("sqlalchemy.url"), poolclass=pool.NullPool
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())