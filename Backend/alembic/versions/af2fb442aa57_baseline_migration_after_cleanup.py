"""Baseline migration after cleanup

Revision ID: af2fb442aa57
Revises: 
Create Date: 2024-08-22 17:03:23.866622

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'af2fb442aa57'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop foreign key constraints first
    op.drop_constraint('reviews_product_id_fkey', 'reviews', type_='foreignkey')
    
    # Now you can drop the products table
    op.drop_table('products')

    # Create the carts table
    op.create_table('carts',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('user_id', sa.UUID(), nullable=False),
        sa.Column('gameID', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('quantity', sa.Integer(), nullable=False),
        sa.Column('image_url', sa.String(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_carts_id'), 'carts', ['id'], unique=False)

    # Add columns to orders
    op.add_column('orders', sa.Column('gameID', sa.String(), nullable=False))
    op.add_column('orders', sa.Column('title', sa.String(), nullable=False))
    op.add_column('orders', sa.Column('price', sa.Float(), nullable=False))
    op.add_column('orders', sa.Column('quantity', sa.Integer(), nullable=False))
    op.add_column('orders', sa.Column('image_url', sa.String(), nullable=True))
    op.add_column('orders', sa.Column('total_price', sa.Float(), nullable=False))
    
    # Add column to reviews
    op.add_column('reviews', sa.Column('gameID', sa.String(), nullable=False))
    
    # Drop the old product_id column in reviews
    op.drop_column('reviews', 'product_id')

def downgrade() -> None:
    # Revert the changes
    op.add_column('reviews', sa.Column('product_id', sa.UUID(), autoincrement=False, nullable=False))
    op.create_foreign_key('reviews_product_id_fkey', 'reviews', 'products', ['product_id'], ['id'])
    
    op.drop_column('reviews', 'gameID')
    op.drop_column('orders', 'total_price')
    op.drop_column('orders', 'image_url')
    op.drop_column('orders', 'quantity')
    op.drop_column('orders', 'price')
    op.drop_column('orders', 'title')
    op.drop_column('orders', 'gameID')

    op.create_table('products',
        sa.Column('id', sa.UUID(), autoincrement=False, nullable=False),
        sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column('price', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
        sa.Column('image_url', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('owner_id', sa.UUID(), autoincrement=False, nullable=False),
        sa.Column('order_id', sa.UUID(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name='products_order_id_fkey'),
        sa.ForeignKeyConstraint(['owner_id'], ['users.id'], name='products_owner_id_fkey'),
        sa.PrimaryKeyConstraint('id', name='products_pkey')
    )
    op.create_index('ix_products_id', 'products', ['id'], unique=False)

    op.drop_index(op.f('ix_carts_id'), table_name='carts')
    op.drop_table('carts')