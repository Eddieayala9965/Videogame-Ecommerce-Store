from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '73b39cda7907'
down_revision: Union[str, None] = 'af2fb442aa57'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add columns with default values to avoid IntegrityError
    op.add_column('orders', sa.Column('name', sa.String(), server_default='Unknown', nullable=False))
    op.add_column('orders', sa.Column('email', sa.String(), server_default='unknown@example.com', nullable=False))
    op.add_column('orders', sa.Column('address', sa.String(), server_default='Unknown Address', nullable=False))
    op.add_column('orders', sa.Column('city', sa.String(), server_default='Unknown City', nullable=False))
    op.add_column('orders', sa.Column('state', sa.String(), server_default='Unknown State', nullable=False))
    op.add_column('orders', sa.Column('zip_code', sa.String(), server_default='00000', nullable=False))
    op.add_column('orders', sa.Column('payment_method', sa.String(), server_default='Unknown', nullable=False))
    op.add_column('orders', sa.Column('card_number', sa.String(), server_default='0000', nullable=False))
    op.add_column('orders', sa.Column('card_expiration_date', sa.String(), server_default='00/00', nullable=False))
    op.add_column('orders', sa.Column('billing_address', sa.String(), server_default='Unknown Address', nullable=False))
    op.add_column('orders', sa.Column('billing_city', sa.String(), server_default='Unknown City', nullable=False))
    op.add_column('orders', sa.Column('billing_state', sa.String(), server_default='Unknown State', nullable=False))
    op.add_column('orders', sa.Column('billing_zip_code', sa.String(), server_default='00000', nullable=False))

    # Optionally, remove default values after migration if not needed for new records
    op.alter_column('orders', 'name', server_default=None)
    op.alter_column('orders', 'email', server_default=None)
    op.alter_column('orders', 'address', server_default=None)
    op.alter_column('orders', 'city', server_default=None)
    op.alter_column('orders', 'state', server_default=None)
    op.alter_column('orders', 'zip_code', server_default=None)
    op.alter_column('orders', 'payment_method', server_default=None)
    op.alter_column('orders', 'card_number', server_default=None)
    op.alter_column('orders', 'card_expiration_date', server_default=None)
    op.alter_column('orders', 'billing_address', server_default=None)
    op.alter_column('orders', 'billing_city', server_default=None)
    op.alter_column('orders', 'billing_state', server_default=None)
    op.alter_column('orders', 'billing_zip_code', server_default=None)


def downgrade() -> None:
    # Drop the columns if you need to roll back the migration
    op.drop_column('orders', 'billing_zip_code')
    op.drop_column('orders', 'billing_state')
    op.drop_column('orders', 'billing_city')
    op.drop_column('orders', 'billing_address')
    op.drop_column('orders', 'card_expiration_date')
    op.drop_column('orders', 'card_number')
    op.drop_column('orders', 'payment_method')
    op.drop_column('orders', 'zip_code')
    op.drop_column('orders', 'state')
    op.drop_column('orders', 'city')
    op.drop_column('orders', 'address')
    op.drop_column('orders', 'email')
    op.drop_column('orders', 'name')
